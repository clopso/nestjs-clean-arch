export type FieldsError  = {
  [field: string]: string[]
}

export interface ValidatorsFieldsInterface<PropsValidated> {
  errors: FieldsError
  validatedData: PropsValidated
  validate (data: any): boolean
}
