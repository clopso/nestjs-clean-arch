import { ClassValidatorFields } from "../../class-validator-fields";
import * as libClassValidator from "class-validator";


class StubClassValidatorFields extends ClassValidatorFields <{
  field: string
}> {}

describe("ClassValidatorFields unit tests", () => {
  it("Should initialize erros and validatedData variables with undefined", () => {
    const sut = new StubClassValidatorFields()

    expect(sut.errors).toBeUndefined()
    expect(sut.validatedData).toBeUndefined()
  })

  it("Should validade with erros", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, "validateSync")
    spyValidateSync.mockReturnValue([
      {property: "field", constraints: { isRequired: "test error"}}
    ])

    const sut = new StubClassValidatorFields()

    expect(sut.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toBeUndefined()
    expect(sut.errors).toStrictEqual({ field: ["test error"]})
  })
})
