/**
 * Equivalente à classe BasicEntity do java
 * define 'id' e 'version'
 *
 * todos os modelos devem extender daqui
 */
export abstract class BasicEntity {
  public id: number = 0;
  public version: number = 0
}
