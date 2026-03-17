<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

// Close modal on Escape key
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = ''
  }
})

const handleBackdropClick = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="backdrop">
      <div
        v-if="isOpen"
        @click="handleBackdropClick"
        class="modal-backdrop"
      />
    </Transition>

    <!-- Modal -->
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="modal-container"
      >
        <div class="modal-content" @click.stop>
          
          <!-- Close Button -->
          <button
            @click="emit('close')"
            class="close-button"
            aria-label="Close modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <!-- Modal Body -->
          <div class="modal-body">
            <ContactForm />
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Backdrop */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9998;
  cursor: pointer;
  backdrop-filter: blur(4px);
}

/* Modal Container */
.modal-container {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  pointer-events: none;
}

/* Modal Content */
.modal-content {
  background: #000;
  border: 3px solid #FF0000;
  max-width: 800px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  pointer-events: auto;
  position: relative;
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.2);
}

/* Close Button - Fixed Position */
.close-button {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 3rem;
  height: 3rem;
  border: 2px solid #FF0000;
  background: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  z-index: 100;
}

.close-button:hover {
  background: #FF0000;
  color: #000;
  transform: rotate(90deg);
}

.close-button svg {
  display: block;
}

/* Modal Body */
.modal-body {
  padding: 5rem 3rem 3rem 3rem;
}

/* Override ContactForm styles for modal */
.modal-body :deep(.contact-form-wrapper) {
  width: 100%;
}

.modal-body :deep(.contact-form) {
  border: none;
  padding: 0;
}

.modal-body :deep(.form-header-label) {
  margin-bottom: 2.5rem;
}

.modal-body :deep(.label-box) {
  border: 2px solid #fff;
  padding: 6px 16px;
}

.modal-body :deep(.privacy-notice) {
  border: 2px solid rgba(255, 255, 255, 0.2);
  padding: 1rem;
  margin-top: 2rem;
}

/* Backdrop Transition */
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

/* Modal Transition */
.modal-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.76, 0, 0.24, 1);
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(30px);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-20px);
}

/* Custom Scrollbar */
.modal-content::-webkit-scrollbar {
  width: 12px;
}

.modal-content::-webkit-scrollbar-track {
  background: #000;
  border-left: 1px solid rgba(255, 0, 0, 0.3);
}

.modal-content::-webkit-scrollbar-thumb {
  background: #FF0000;
  border: 2px solid #000;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #fff;
}

/* Responsive */
@media (max-width: 1024px) {
  .modal-content {
    max-width: 700px;
  }

  .modal-body {
    padding: 4.5rem 2.5rem 2.5rem 2.5rem;
  }
}

@media (max-width: 768px) {
  .modal-container {
    padding: 1rem;
    align-items: flex-start;
    padding-top: 2rem;
  }

  .modal-content {
    max-height: 92vh;
    max-width: 100%;
  }

  .close-button {
    top: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
  }

  .modal-body {
    padding: 4rem 1.5rem 2rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .modal-body {
    padding: 4rem 1.25rem 1.5rem 1.25rem;
  }
}
</style>
