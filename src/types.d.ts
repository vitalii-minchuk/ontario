declare namespace cloudinary {
  function createUploadWidget(
    options: {
      cloudName: string
      uploadPreset: string
    },
    callback: (error: any, result: any) => void
  ): { open: () => void }
}
