export class GeneratorsService {
  generators: {
    A_parameter: number;
    B_parameter: number;
    C_parameter: number;
    Pmin: number;
    Pmax: number;
    F: number;
  }[] = [];
  flapc: { value: number; index: number }[] = [];
  priority_list: { value: number; index: number }[][] = [];
  loads: number[] = [];
  fromfile = false;
  dps: { x: number; y: number }[][] = [];

  addGenerator() {
    this.generators.push({
      A_parameter: 0,
      B_parameter: 0,
      C_parameter: 0,
      Pmin: 0,
      Pmax: 0,
      F: 0,
    });
    this.flapc.push({ value: 0, index: 0 });
  }

  updateIndLoad(id: number, Load: number) {
    this.loads[id] = Load;
  }

  updateLoad(loads: number[]) {
    if (!this.fromfile) {
      this.loads = loads;
    }
  }

  updateGenerator(
    id: number,
    A_parameter: number,
    B_parameter: number,
    C_parameter: number,
    Pmin: number,
    Pmax: number,
    F: number
  ) {
    this.generators[id].A_parameter = A_parameter;
    this.generators[id].B_parameter = B_parameter;
    this.generators[id].C_parameter = C_parameter;
    this.generators[id].Pmin = Pmin;
    this.generators[id].Pmax = Pmax;
    this.generators[id].F = F;
    this.calculateFlapc(id);
  }

  calculateFlapc(id: number) {
    this.flapc[id].value =
      ((this.generators[id].A_parameter +
        this.generators[id].B_parameter * this.generators[id].Pmax +
        this.generators[id].C_parameter * this.generators[id].Pmax ** 2) *
        this.generators[id].F) /
      this.generators[id].Pmax;

    this.flapc[id].index = id;
  }

  //to create priority list
  calculate() {
    this.flapc.sort(function (a, b) {
      return a.value - b.value;
    });
    for (let i = 0; i < this.generators.length; i++) {
      this.createDSP(this.generators[i]);
      let tempList: { value: number; index: number }[] = [];
      let j = this.generators.length - i;
      while (j) {
        tempList.push(this.flapc[j - 1]);
        j--;
      }
      this.priority_list.push(tempList);
    }
  }

  createDSP(generator: {
    A_parameter: number;
    B_parameter: number;
    C_parameter: number;
    Pmin: number;
    Pmax: number;
    F: number;
  }) {
    let temp: { x: number; y: number }[] = [];
    for (let i = generator.Pmin; i <= generator.Pmax; i++) {
      let y =
        generator.A_parameter +
        generator.B_parameter * i +
        generator.C_parameter * i * i;
      temp.push({ x: i, y: y });
    }
    this.dps.push(temp);
  }

  get_dps(id: number) {
    return this.dps[id];
  }

  get_generator() {
    return this.generators;
  }

  get_list() {
    return this.priority_list;
  }

  get_load() {
    return this.loads;
  }

  get_flapc() {
    return this.flapc;
  }

  getInitialvalue(fileInput: string) {
    let Input_param = fileInput.split(/\r?\n/);
    let Initial_value = Input_param[0].split(",");
    let Load_string = Input_param[1].split(",");
    for (let i = 0; i < Load_string.length; i++) {
      this.loads.push(Number(Load_string[i]));
    }
    this.fromfile = true;

    return Number(Initial_value[0]);
  }

  readInputfile(fileInput: string) {
    let gen_param = fileInput.split(/\r?\n/);
    console.log(fileInput);
    console.log(this.generators);
    console.log(this.loads);
    for (let i = 2; i < gen_param.length; i++) {
      let values = gen_param[i].split(",");
      this.updateGenerator(
        i - 2,
        Number(values[0]),
        Number(values[1]),
        Number(values[2]),
        Number(values[4]),
        Number(values[5]),
        Number(values[3])
      );
    }
    console.log(this.generators);
  }
}
