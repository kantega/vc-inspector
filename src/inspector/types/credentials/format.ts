export type Format = {
  name: string;
  /*
   * If the format is not JSON,
   * this value is the JSON representation
   */
  convertedToJSON?: string;
};
