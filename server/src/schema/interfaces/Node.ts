import { Field, ID, InterfaceType } from "type-graphql";

@InterfaceType({ description: "IDを持つオブジェクトを表すインターフェイス" })
export abstract class Node {
  @Field(type => ID)
  id: string

  constructor(id: string) {
    this.id = id
  }
}
