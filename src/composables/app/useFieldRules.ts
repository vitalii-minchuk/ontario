interface IFieldRulesComposition {
  required: (v: string | number) => boolean | string
  lengthValue: (v: string, maxLength?: number) => boolean | string
}

export function useFieldRules(): IFieldRulesComposition {
  const required = (v: string | number) => !!v || v === 0 || 'Field required'
  const lengthValue = (v: string, maxLength = 255) => v?.length <= maxLength || 'Too long'

  return {
    required,
    lengthValue
  }
}
