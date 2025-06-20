import { validate as uuidValidate } from "uuid"
import { Entity } from "../../entity"

type StubProps = {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> {

}

describe("Entity unit tests", () => {
  it("Should set props and id", () => {
    const props = {
      prop1: "value1",
      prop2: 15
    }

    const entity = new StubEntity(props)

    expect(entity.props).toEqual(props)
    expect(entity._id).not.toBeNull()
    expect(uuidValidate(entity._id)).toBeTruthy()
  })

  it("Should accept a valid uuid", () => {
    const props = {
      prop1: "value1",
      prop2: 15
    }
    const id = '0f4096ed-2e84-4bf3-b5ef-db13872fd2ca'
    const entity = new StubEntity(props, id)

    expect(uuidValidate(entity._id)).toBeTruthy()
    expect(entity._id).toBe(id)
  })

  it("Should convert entity to a JSON", () => {
    const props = {
      prop1: "value1",
      prop2: 15
    }
    const id = '0f4096ed-2e84-4bf3-b5ef-db13872fd2ca'
    const entity = new StubEntity(props, id)

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    })
  })
})
