<script setup lang="ts">
  import ContactForm from '~/components/contact/ContactForm.vue'

  const props = defineProps<{ isOpen: boolean }>()
  const emit = defineEmits<{ close: [] }>()

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.isOpen) emit('close')
  }

  watch(() => props.isOpen, (val) => {
    if (val) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = ''
    document.body.style.touchAction = ''
  })
</script>

<template>
  <Teleport to="body">

    <!-- Backdrop -->
    <Transition name="backdrop">
      <div
        v-if="isOpen"
        class="modal-backdrop"
        @click="emit('close')"
        @wheel.prevent
        @touchmove.prevent
      />
    </Transition>

    <!-- Modal -->
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="modal-container"
        @wheel.prevent
        @touchmove.prevent
      >
        <div
          class="modal-content"
          @click.stop
          @wheel.stop
          @touchmove.stop
        >
          <!-- Close -->
          <div class="modal-header">
            <button
              class="modal-close"
              @click="emit('close')"
              aria-label="Close modal"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="3">
                <line x1="18" y1="6"  x2="6"  y2="18"/>
                <line x1="6"  y1="6"  x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <!-- Body — no scroll -->
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

  /* Container — centers the modal, blocks all scroll */
  .modal-container {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  /* Content — no scroll, auto height */
  .modal-content {
    background: #000;
    border: 3px solid #ff0000;
    max-width: 800px;
    width: 100%;
    height: auto;         /* ← fits content, no scroll */
    overflow: visible;    /* ← no scroll at all */
    pointer-events: auto;
    position: relative;
    box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.2);
  }

  /* Header row with close button */
  .modal-header {
    display: flex;
    justify-content: flex-end;
    padding: 1.25rem 1.25rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  /* Close button */
  .modal-close {
    width: 2.5rem;
    height: 2.5rem;
    border: 2px solid #ff0000;
    background: #000;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    flex-shrink: 0;
  }
  .modal-close:hover {
    background: #ff0000;
    color: black;
    transform: rotate(90deg);
  }

  /* Body */
  .modal-body {
    padding: 1.5rem 2rem 2rem;
  }

  /* Override ContactForm border inside modal */
  .modal-body :deep(.contact-form) {
    border: none;
    padding: 0;
  }

  /* Transitions */
  .backdrop-enter-active, .backdrop-leave-active { transition: opacity 0.3s ease; }
  .backdrop-enter-from,  .backdrop-leave-to      { opacity: 0; }

  .modal-enter-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
  .modal-leave-active { transition: all 0.3s cubic-bezier(0.76, 0, 0.24, 1); }
  .modal-enter-from   { opacity: 0; transform: scale(0.9) translateY(30px); }
  .modal-leave-to     { opacity: 0; transform: scale(0.95) translateY(-20px); }

  /* Responsive */
  @media (max-width: 1024px) {
    .modal-content { max-width: 700px; }
  }

  @media (max-width: 768px) {
    .modal-container { padding: 1rem; }
    .modal-content   { max-width: 100%; }
    .modal-close     { width: 2rem; height: 2rem; }
    .modal-body      { padding: 1rem 1.25rem 1.5rem; }
  }
</style>