export default class Timezone {
  constructor(code, name, offsetMinutes, country = 'N/A') {
    this.code = code;
    this.name = name;
    this.country = country;
    this.offsetMinutes = offsetMinutes;
  }
}
