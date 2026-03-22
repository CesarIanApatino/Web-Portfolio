interface ContactFormData {
  name: string
  email: string
  message: string
}

export const useContactForm = () => {
  const form = ref<ContactFormData>({ name: '', email: '', message: '' })
  const botField        = ref('')
  const formLoadTime    = ref(Date.now())
  const isSubmitting    = ref(false)
  const submitSuccess   = ref(false)
  const submitError     = ref(false)
  const formErrors      = ref<string[]>([])

  const validateForm = (): boolean => {
    formErrors.value = []

    if (botField.value) {
      formErrors.value.push('Security check failed')
      return false
    }

    if (Date.now() - formLoadTime.value < 3000) {
      formErrors.value.push('Please take your time filling the form')
      return false
    }

    const name = form.value.name.trim()
    if (name.length < 2)   formErrors.value.push('Name must be at least 2 characters')
    if (name.length > 100) formErrors.value.push('Name is too long (max 100 characters)')
    if (!/^[a-zA-Z\s\-']+$/.test(name)) formErrors.value.push('Name contains invalid characters')

    const email = form.value.email.trim()
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
      formErrors.value.push('Please enter a valid email address')
    if (email.length > 255) formErrors.value.push('Email is too long')

    const message = form.value.message.trim()
    if (message.length < 10)   formErrors.value.push('Message must be at least 10 characters')
    if (message.length > 5000) formErrors.value.push('Message is too long (max 5000 characters)')
    if (((message.match(/(https?:\/\/|www\.)/gi)) || []).length > 2)
      formErrors.value.push('Too many links detected')

    return formErrors.value.length === 0
  }

  const resetForm = () => {
    form.value        = { name: '', email: '', message: '' }
    botField.value    = ''
    formLoadTime.value = Date.now()
  }

  const handleSubmit = async () => {
    if (isSubmitting.value) return

    isSubmitting.value  = true
    submitSuccess.value = false
    submitError.value   = false

    if (!validateForm()) {
      submitError.value  = true
      isSubmitting.value = false
      return
    }

    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:      form.value.name.trim(),
          email:     form.value.email.trim().toLowerCase(),
          message:   form.value.message.trim(),
          botField:  botField.value,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
        }),
      })

      if (!res.ok) throw new Error(await res.text() || 'Failed to send message')

      submitSuccess.value = true
      setTimeout(() => {
        resetForm()
        submitSuccess.value = false
      }, 4000)

    } catch (error) {
      console.error('Submission error:', error)
      submitError.value  = true
      formErrors.value   = ['Failed to send message. Please try again.']
      setTimeout(() => {
        submitError.value = false
        formErrors.value  = []
      }, 5000)
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    form, botField, formErrors,
    isSubmitting, submitSuccess, submitError,
    handleSubmit,
  }
}