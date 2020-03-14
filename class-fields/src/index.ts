export class Foo {
  #hardPrivateProperty: any = 1
  private softPrivateProperty: any = 1

  readHardPrivateProperty(): any {
    return this.#hardPrivateProperty
  }

  writeHardPrivateProperty(): void {
    this.#hardPrivateProperty = 1
  }

  readSoftPrivateProperty(): any {
    return this.softPrivateProperty
  }

  writeSoftPrivateProperty(): void {
    this.softPrivateProperty = 1
  }
}
