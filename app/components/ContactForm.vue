<script setup lang="ts">
import { ref } from 'vue'

const contactForm = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  submitSuccess.value = false
  submitError.value = false
  
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 1500)
    })
    
    console.log('Form submitted:', contactForm.value)
    submitSuccess.value = true    
    setTimeout(() => {
      contactForm.value = {
        name: '',
        email: '',
        message: ''
      }
      submitSuccess.value = false
    }, 3000)
    
  } catch (error) {
    console.error('Submission error:', error)
    submitError.value = true
    
    setTimeout(() => {
      submitError.value = false
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
      class="brutal-border-red p-6 mb-6 bg-brutalist-red text-black"
    >
      <p class="font-mono text-sm tracking-widest text-center">
        ✓ MESSAGE SENT SUCCESSFULLY! I'LL GET BACK TO YOU SOON.
      </p>
    </div>

    <!-- Error Message -->
    <div 
      v-if="submitError"
      class="brutal-border-red p-6 mb-6"
    >
      <p class="font-mono text-sm tracking-widest text-center text-brutalist-red">
        ✗ FAILED TO SEND MESSAGE. PLEASE TRY AGAIN.
      </p>
    </div>

    <!-- Contact Form -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="brutal-border p-8 hover:brutal-border-red transition-all duration-300 focus-within:brutal-border-red">
        <label class="font-mono text-xs tracking-widest opacity-50 mb-2 block">NAME *</label>
        <input 
          v-model="contactForm.name"
          type="text" 
          placeholder="JOHN DOE" 
          required
          class="w-full bg-transparent font-mono text-lg focus:outline-none"
        />
      </div>
      
      <div class="brutal-border p-8 hover:brutal-border-red transition-all duration-300 focus-within:brutal-border-red">
        <label class="font-mono text-xs tracking-widest opacity-50 mb-2 block">EMAIL *</label>
        <input 
          v-model="contactForm.email"
          type="email" 
          placeholder="JOHN@EXAMPLE.COM" 
          required
          class="w-full bg-transparent font-mono text-lg focus:outline-none"
        />
      </div>
      
      <div class="brutal-border p-8 hover:brutal-border-red transition-all duration-300 focus-within:brutal-border-red">
        <label class="font-mono text-xs tracking-widest opacity-50 mb-2 block">MESSAGE *</label>
        <textarea 
          v-model="contactForm.message"
          placeholder="TELL ME ABOUT YOUR PROJECT..." 
          rows="6"
          required
          class="w-full bg-transparent font-mono text-lg focus:outline-none resize-none"
        ></textarea>
      </div>
      
      <button 
        type="submit" 
        :disabled="isSubmitting"
        class="brutal-border-red px-12 py-6 font-mono text-sm tracking-widest hover:bg-brutalist-red hover:text-black transition-all duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="!isSubmitting">SEND MESSAGE</span>
        <span v-else class="flex items-center justify-center gap-3">
          <span class="animate-pulse">SENDING</span>
          <span class="loading-dots">...</span>
        </span>
      </button>
    </form>

    <!-- Form Info -->
    <div class="brutal-border p-6 mt-6 opacity-70">
      <p class="font-mono text-xs text-center">
        Your information will be kept confidential and used only to respond to your inquiry.
      </p>
    </div>
  </div>
</template>

<style scoped>
input:focus,
textarea:focus {
  outline: none;
}

.loading-dots {
  animation: dots 1.5s steps(3, end) infinite;
}

@keyframes dots {
  0%, 20% {
    content: '.';
  }
  40% {
    content: '..';
  }
  60%, 100% {
    content: '...';
  }
}

/* Custom placeholder styles */
input::placeholder,
textarea::placeholder {
  opacity: 0.3;
  font-family: 'Space Mono', monospace;
}

input:focus::placeholder,
textarea:focus::placeholder {
  opacity: 0.5;
}
</style>