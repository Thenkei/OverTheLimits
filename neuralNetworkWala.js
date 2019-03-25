const tf = require('@tensorflow/tfjs-node');

// Build and compile model.
const model = tf.sequential();

const hidden_layer = {
  inputShape: [2],
  activation: 'softmax',
  units:10
}

const output_layer = {
  activation: 'sigmoid',
  units: 1
}

model.add(tf.layers.dense(hidden_layer));
model.add(tf.layers.dense(output_layer));
model.compile( {optimizer: 'sgd', loss: 'meanSquaredError'} );

// This represente a small random set of data for this model
const xs = tf.tensor2d([[1,1], [2,2], [3,6], [4,1], [4,5]], [5,2]);
const ys = tf.tensor2d([[0.0], [1.0], [0.8], [0.0], [1.0]], [5,1]);

train_data();

// How to use it
model.predict(tf.tensor2d([[2,2]], [1,2])).print();
model.predict(tf.tensor2d([[1,2]], [1,2])).print();


async function train_data(){
  for(let i=0;i<10;i++){
    const res = await model.fit(xs, ys, {epochs: 100});
    console.log(res.history.loss[0]);
  }
}
