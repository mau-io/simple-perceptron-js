class Perceptron {
  constructor(inputs) {
    this.bias         = 1;
    this.dentrites    = inputs;
    this.weights      = this.init();
    this.learningRate;
  }

  // init random weights
  init(){
    let weights = [];

    for(var i = 0; i <= this.dentrites; i++) {
      weights.push( Math.random() * (0.5 - (-0.5)) + (-0.5) );
      //weights.push(0.125);
    }
    return weights;

  }

  predict(inputs){
    let net = 0;

    // Add first bias value
    if(inputs.length < this.weights.length){
      inputs = [this.bias, ...inputs];
    }

    // ==========================================
    // 1.- Activation Equation
    // ==========================================
    for (let i = 0; i < inputs.length; i++) {
      net += inputs[i] * this.weights[i];
    }

    // ==========================================
    // 2.- Activation function
    // ==========================================
    return Math.tanh(net) > 0 ? 1 : 0;
  }

  train(data, learningRate = 0.125, maxEpochs = 200){

    this.learningRate = learningRate;

    // Add bias value
    for (let i = 0; i < data.length; i++) {
      data[i].input =  [this.bias, ...data[i].input];
    }

    let success = false;
    let count = 0;
    // Epochs to train.
    while ( !success && count < maxEpochs) {
      count++;
      success = this.learning(data);
    }

   return success ? `Trained in ${count}` : `${count} Max limit, Not trained`;

  }

  learning(data){

    let correctPredictions = 0;

    // training sample
    for (let s = 0; s < data.length; s++) {
      let output = this.predict(data[s].input);
      let delta = data[s].output;

      if(delta != output){

        // ==========================================
        // update neuron weights
        // ==========================================
        for (let i = 0; i < this.weights.length; i++) {
          // Training Equation
          this.weights[i] += this.learningRate * ((delta - output) * data[s].input[i]);
        }

      }else{
        correctPredictions++;
      }

    }

    return (correctPredictions == data.length);

  }

}

/*

const ann = new Perceptron(4); // param: number inputs

ann.learning([
  { input: [0,0,1,1], output: 1},
  { input: [1,1,1,1], output: 0},
  { input: [1,1,0,0], output: 0},
  { input: [1,1,1,0], output: 1},
]);

console.log(ann.predict([0,0,1,1]));
console.log(ann.predict([1,1,1,1]));
console.log(ann.predict([1,1,1,0]));

console.log(ann.weights);

*/
