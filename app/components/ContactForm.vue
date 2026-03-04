<script setup lang="ts">
import { ref } from 'vue'

const contactForm = ref({
  name: '',
  email: '',
  message: ''
})

// Honeypot field – bots will fill this in, real users won't
const botField = ref('')

// Timestamp to detect too-fast submissions
const formLoadTime = ref(Date.now())

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref(false)

// Validation messages
const formErrors = ref<string[]>([])

// Enhanced validation
const validateForm = (): boolean => {
  formErrors.value = []

  // Check honeypot
  if (botField.value) {
    console.warn('Spam detected via honeypot')
    formErrors.value.push('Security check failed')
    return false
  }

  // Check submission speed (must take at least 3 seconds)
  const timeTaken = Date.now() - formLoadTime.value
  if (timeTaken < 3000) {
    console.warn('Submission too fast - possible bot')
    formErrors.value.push('Please take your time filling the form')
    return false
  }

  // Name validation
  const name = contactForm.value.name.trim()
  if (name.length < 2) {
    formErrors.value.push('Name must be at least 2 characters')
  }
  if (name.length > 100) {
    formErrors.value.push('Name is too long (max 100 characters)')
  }
  if (!/^[a-zA-Z\s\-']+$/.test(name)) {
    formErrors.value.push('Name contains invalid characters')
  }

  // Email validation
  const email = contactForm.value.email.trim()
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(email)) {
    formErrors.value.push('Please enter a valid email address')
  }
  if (email.length > 255) {
    formErrors.value.push('Email is too long')
  }

  // Message validation
  const message = contactForm.value.message.trim()
  if (message.length < 10) {
    formErrors.value.push('Message must be at least 10 characters')
  }
  if (message.length > 5000) {
    formErrors.value.push('Message is too long (max 5000 characters)')
  }

  // Check for suspicious patterns (URLs, excessive special chars)
  const urlPattern = /(https?:\/\/|www\.)/gi
  const urlCount = (message.match(urlPattern) || []).length
  if (urlCount > 2) {
    formErrors.value.push('Too many links detected')
  }

  return formErrors.value.length === 0
}

const handleSubmit = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true
  submitSuccess.value = false
  submitError.value = false

  // Validate form
  if (!validateForm()) {
    submitError.value = true
    isSubmitting.value = false
    return
  }

  try {
    const payload = {
      name: contactForm.value.name.trim(),
      email: contactForm.value.email.trim().toLowerCase(),
      message: contactForm.value.message.trim(),
      botField: botField.value,
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    }

    const res = await fetch('/.netlify/functions/contact', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(errorText || 'Failed to send message')
    }

    submitSuccess.value = true
    
    // Reset form after success
    setTimeout(() => {
      contactForm.value = {
        name: '',
        email: '',
        message: ''
      }
      botField.value = ''
      submitSuccess.value = false
      formLoadTime.value = Date.now() // Reset timer
    }, 4000)

  } catch (error) {
    console.error('Submission error:', error)
    submitError.value = true
    formErrors.value = ['Failed to send message. Please try again.']

    setTimeout(() => {
      submitError.value = false
      formErrors.value = []
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="contact-form-wrapper">
    <!-- Success Message -->
    <div 
      v-if="submitSuccess"
      class="success-message"
    >
      <div class="message-box">
        <span class="message-icon">✓</span>
        <span class="message-text">MESSAGE SENT! I'LL RESPOND SOON.</span>
      </div>
    </div>

    <!-- Error Messages -->
    <div v-if="submitError && formErrors.length" class="error-container">
      <div class="error-box">
        <div class="error-header">
          <span class="error-icon">⚠</span>
          <span class="error-title">ERROR</span>
        </div>
        <ul class="error-list">
          <li v-for="(err, idx) in formErrors" :key="idx" class="error-item">
            {{ err }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Contact Form -->
    <form @submit.prevent="handleSubmit" class="contact-form">
      <!-- Honeypot (hidden) -->
      <input
        type="text"
        name="bot-field"
        v-model="botField"
        class="honeypot"
        tabindex="-1"
        autocomplete="off"
        aria-hidden="true"
      />

      <div class="form-header-label">
        <div class="label-box">
          <span>MESSAGE</span>
        </div>
      </div>

      <!-- Name Field -->
      <div class="form-field">
        <label class="field-label">
          <span class="label-number">[01]</span>
          <span class="label-text">NAME</span>
        </label>
        <input 
          v-model="contactForm.name"
          type="text" 
          class="field-input"
          placeholder="JOHN DOE"
          maxlength="100"
          required
          autocomplete="name"
        />
      </div>

      <!-- Email Field -->
      <div class="form-field">
        <label class="field-label">
          <span class="label-number">[02]</span>
          <span class="label-text">EMAIL</span>
        </label>
        <input 
          v-model="contactForm.email"
          type="email" 
          class="field-input"
          placeholder="JOHN@EXAMPLE.COM"
          maxlength="255"
          required
          autocomplete="email"
        />
      </div>

      <!-- Message Field -->
      <div class="form-field">
        <label class="field-label">
          <span class="label-number">[03]</span>
          <span class="label-text">MESSAGE</span>
        </label>
        <textarea 
          v-model="contactForm.message"
          class="field-textarea"
          placeholder="YOUR MESSAGE..."
          rows="5"
          maxlength="5000"
          required
        ></textarea>
      </div>

      <!-- Character Count -->
      <div class="char-count">
        <span class="count-text">
          {{ contactForm.message.length }} / 5000
        </span>
      </div>

      <!-- Submit Button -->
      <button 
        type="submit" 
        :disabled="isSubmitting"
        class="submit-btn"
      >
        <span v-if="!isSubmitting" class="btn-content">
          <span class="btn-text">SEND</span>
          <span class="btn-arrow">→</span>
        </span>
        <span v-else class="btn-loading">
          <span class="loading-text">SENDING</span>
          <span class="loading-dots">...</span>
        </span>
      </button>
    </form>

    <!-- Privacy Notice -->
    <div class="privacy-notice">
      <p class="notice-text">
        Your information is kept confidential and used only to respond to your inquiry.
      </p>
    </div>
  </div>
</template>

<style scoped>
.contact-form-wrapper {
  width: 100%;
}

/* Honeypot - completely hidden */
.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

/* Success Message */
.success-message {
  margin-bottom: 2rem;
  border: 3px solid #00FF00;
  background: #00FF00;
  padding: 1.5rem;
  animation: slideIn 0.3s ease;
}

.message-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-family: var(--font-mono);
  color: #000;
}

.message-icon {
  font-size: 20px;
  font-weight: bold;
}

.message-text {
  font-size: 12px;
  letter-spacing: 0.15em;
}

/* Error Container */
.error-container {
  margin-bottom: 2rem;
  animation: slideIn 0.3s ease;
}

.error-box {
  border: 3px solid #FF0000;
  padding: 1.5rem;
  background: rgba(255, 0, 0, 0.1);
}

.error-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-family: var(--font-mono);
  color: #FF0000;
}

.error-icon {
  font-size: 16px;
}

.error-title {
  font-size: 12px;
  letter-spacing: 0.15em;
  font-weight: bold;
}

.error-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.error-item {
  font-family: var(--font-mono);
  font-size: 11px;
  color: #FF0000;
  padding: 0.25rem 0;
  letter-spacing: 0.05em;
}

.error-item::before {
  content: '→ ';
  margin-right: 0.5rem;
}

/* Form */
.contact-form {
  border: 3px solid #FF0000;
  padding: 2rem;
  background: #000;
}

.form-header-label {
  margin-bottom: 2rem;
}

.label-box {
  border: 2px solid #fff;
  display: inline-block;
  padding: 4px 12px;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.2em;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.15em;
  color: #fff;
}

.label-number {
  color: #FF0000;
  opacity: 0.7;
}

.label-text {
  opacity: 0.7;
}

.field-input,
.field-textarea {
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 1rem 0;
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 0.05em;
  transition: border-color 0.3s ease;
}

.field-input::placeholder,
.field-textarea::placeholder {
  color: rgba(255, 255, 255, 0.2);
  text-transform: uppercase;
}

.field-input:focus,
.field-textarea:focus {
  outline: none;
  border-bottom-color: #FF0000;
}

.field-textarea {
  resize: vertical;
  min-height: 120px;
}

/* Character Count */
.char-count {
  text-align: right;
  margin-top: -1rem;
}

.count-text {
  font-family: var(--font-mono);
  font-size: 10px;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.05em;
}

/* Submit Button */
.submit-btn {
  background: transparent;
  border: 3px solid #fff;
  color: #fff;
  padding: 1.5rem 2rem;
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  align-self: flex-start;
  min-width: 200px;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: #FF0000;
  transition: left 0.4s ease;
  z-index: 0;
}

.submit-btn:hover:not(:disabled)::before {
  left: 0;
}

.submit-btn:hover:not(:disabled) {
  border-color: #FF0000;
  color: #000;
}

.btn-content,
.btn-loading {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.btn-arrow {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.submit-btn:hover:not(:disabled) .btn-arrow {
  transform: translateX(5px);
}

/* Loading Animation */
.btn-loading {
  justify-content: center;
  gap: 0.5rem;
}

.loading-dots {
  animation: dots 1.5s infinite;
}

@keyframes dots {
  0%, 20% { content: '.'; }
  40% { content: '..'; }
  60%, 100% { content: '...'; }
}

/* Privacy Notice */
.privacy-notice {
  margin-top: 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 1rem;
  opacity: 0.7;
}

.notice-text {
  font-family: var(--font-mono);
  font-size: 10px;
  text-align: center;
  color: #fff;
  letter-spacing: 0.05em;
  margin: 0;
}

/* Animations */
@keyframes slideIn {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .contact-form {
    padding: 1.5rem;
  }

  .submit-btn {
    width: 100%;
    justify-content: center;
  }

  .btn-content {
    justify-content: space-between;
  }
}
</style>