export const useContact = () => {
  const contactLinks = [
    {
      id: '01',
      label: 'LINKEDIN',
      value: 'linkedin.com/in/cesar-ian-apatino',
      href: 'https://www.linkedin.com/in/cesar-ian-apatino',
      border: 'red',
    },
    {
      id: '02',
      label: 'LOCATION',
      value: 'Butuan City, Philippines',
      href: null,
      border: 'white',
    },
    {
      id: '03',
      label: 'GITHUB',
      value: 'github.com/CesarIanApatino',
      href: 'https://github.com/CesarIanApatino',
      border: 'red',
    },
  ]

  return { contactLinks }
}