<script setup lang="ts">
  const {
    form, botField, formErrors,
    isSubmitting, submitSuccess, submitError,
    handleSubmit,
  } = useContactForm()
</script>

<template>
  <div class="contact-form-wrapper">

    <!-- Success -->
    <Transition name="slide-in">
      <div v-if="submitSuccess" class="success-msg">
        <span class="success-msg__icon">✓</span>
        <span class="success-msg__text font-mono">MESSAGE SENT! I'LL RESPOND SOON.</span>
      </div>
    </Transition>

    <!-- Errors -->
    <Transition name="slide-in">
      <div v-if="submitError && formErrors.length" class="error-box">
        <div class="error-box__header font-mono">
          <span>⚠</span>
          <span>ERROR</span>
        </div>
        <ul class="error-box__list">
          <li v-for="(err, i) in formErrors" :key="i" class="error-box__item font-mono">
            {{ err }}
          </li>
        </ul>
      </div>
    </Transition>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="contact-form">

      <!-- Honeypot -->
      <input
        type="text"
        name="bot-field"
        v-model="botField"
        class="honeypot"
        tabindex="-1"
        autocomplete="off"
        aria-hidden="true"
      />

      <div class="form-grid">

        <div class="form-grid__left">

          <!-- Name -->
          <div class="form-field">
            <label class="form-field__label font-mono">
              <span class="form-field__number">[01]</span>
              <span class="form-field__name">NAME</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              class="form-field__input font-mono"
              placeholder="Your Name"
              maxlength="100"
              required
              autocomplete="name"
            />
          </div>

          <div class="form-field">
            <label class="form-field__label font-mono">
              <span class="form-field__number">[02]</span>
              <span class="form-field__name">EMAIL</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              class="form-field__input font-mono"
              placeholder="your.email@example.com"
              maxlength="255"
              required
              autocomplete="email"
            />
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="submit-btn font-mono"
          >
            <span v-if="!isSubmitting" class="submit-btn__content">
              <span>SEND</span>
              <span class="submit-btn__arrow">→</span>
            </span>
            <span v-else class="submit-btn__loading">
              <span>SENDING</span>
              <span class="submit-btn__dots">...</span>
            </span>
          </button>

        </div>

        <div class="form-grid__right">
          <div class="form-field form-field--full">
            <label class="form-field__label font-mono">
              <span class="form-field__number">[03]</span>
              <span class="form-field__name">MESSAGE</span>
            </label>
            <textarea
              v-model="form.message"
              class="form-field__textarea font-mono"
              placeholder="YOUR MESSAGE..."
              maxlength="5000"
              required
            />
            <div class="form-field__char-count font-mono">
              {{ form.message.length }} / 5000
            </div>
          </div>
        </div>

      </div>

    </form>

    <!-- Privacy -->
    <div class="privacy-notice">
      <p class="privacy-notice__text font-mono">
        Your information is kept confidential and used only to respond to your inquiry.
      </p>
    </div>

  </div>
</template>

<style scoped>
  .contact-form-wrapper { width: 100%; }

  /* Honeypot */
  .honeypot {
    position: absolute;
    left: -9999px;
    width: 1px; height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  /* Success */
  .success-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    border: 3px solid #00ff00;
    background: #00ff00;
    padding: 1.5rem;
    color: black;
  }
  .success-msg__icon { font-size: 20px; font-weight: bold; }
  .success-msg__text { font-size: 12px; letter-spacing: 0.15em; }

  /* Error */
  .error-box {
    margin-bottom: 2rem;
    border: 3px solid #ff0000;
    padding: 1.5rem;
    background: rgba(255, 0, 0, 0.1);
  }
  .error-box__header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    color: #ff0000;
    font-size: 12px;
    letter-spacing: 0.15em;
    font-weight: bold;
  }
  .error-box__list  { list-style: none; padding: 0; margin: 0; }
  .error-box__item  { font-size: 11px; color: #ff0000; padding: 0.25rem 0; letter-spacing: 0.05em; }
  .error-box__item::before { content: '→ '; }

  /* Form */
  .contact-form {
    background: #000;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* ── 2 column grid ── */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: stretch;
  }

  .form-grid__left {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-grid__right {
    display: flex;
    flex-direction: column;
  }

  /* Full height textarea on right */
  .form-field--full {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  /* Fields */
  .form-field { display: flex; flex-direction: column; gap: 0.5rem; }

  .form-field__label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 10px;
    letter-spacing: 0.15em;
    color: white;
  }
  .form-field__number { color: #ff0000; opacity: 0.7; }
  .form-field__name   { opacity: 0.7; }

  .form-field__input,
  .form-field__textarea {
    background: transparent;
    border: none;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 1rem 0;
    font-size: 14px;
    letter-spacing: 0.05em;
    transition: border-color 0.3s ease;
    width: 100%;
    font-family: var(--font-mono);
  }
  .form-field__input::placeholder,
  .form-field__textarea::placeholder {
    color: rgba(255, 255, 255, 0.2);
    text-transform: uppercase;
  }
  .form-field__input:focus,
  .form-field__textarea:focus {
    outline: none;
    border-bottom-color: #ff0000;
  }

  /* Textarea fills full height of right column */
  .form-field__textarea {
    flex: 1;
    resize: none;
    min-height: 180px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 1rem;
    margin-top: 0.5rem;
  }
  .form-field__textarea:focus {
    border-color: #ff0000;
  }

  .form-field__char-count {
    text-align: right;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.3);
    letter-spacing: 0.05em;
    margin-top: 0.25rem;
  }

  /* Submit — full width on left column */
  .submit-btn {
    width: 100%;
    background: transparent;
    border: 2px solid white;
    color: white;
    padding: 1.25rem 2rem;
    font-size: 14px;
    letter-spacing: 0.15em;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    margin-top: auto;
  }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .submit-btn::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: #ff0000;
    transition: left 0.4s ease;
    z-index: 0;
  }
  .submit-btn:hover:not(:disabled)::before { left: 0; }
  .submit-btn:hover:not(:disabled) { border-color: #ff0000; color: black; }

  .submit-btn__content,
  .submit-btn__loading {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .submit-btn__arrow { font-size: 20px; transition: transform 0.3s ease; }
  .submit-btn:hover:not(:disabled) .submit-btn__arrow { transform: translateX(5px); }
  .submit-btn__loading { justify-content: center; gap: 0.5rem; }
  .submit-btn__dots { animation: dots 1.5s infinite; }

  /* Privacy */
  .privacy-notice {
    margin-top: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 0.75rem 1rem;
    opacity: 0.6;
  }
  .privacy-notice__text {
    font-size: 10px;
    text-align: center;
    color: white;
    letter-spacing: 0.05em;
    margin: 0;
  }

  /* Transitions */
  .slide-in-enter-active { animation: slideIn 0.3s ease; }
  .slide-in-leave-active { animation: slideIn 0.3s ease reverse; }

  @keyframes slideIn {
    from { transform: translateY(-10px); opacity: 0; }
    to   { transform: translateY(0);     opacity: 1; }
  }

  @keyframes dots {
    0%,20%  { opacity: 0.3; }
    60%     { opacity: 1; }
    100%    { opacity: 0.3; }
  }

  /* ── Responsive — stack on mobile ── */
  @media (max-width: 768px) {
    .form-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .form-field__textarea {
      min-height: 140px;
    }

    .submit-btn {
      width: 100%;
    }
  }
</style>