const tf = require('@tensorflow/tfjs-node');

// Build and compile model.
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));
model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});

// Generate some synthetic data for training.
const xs = tf.tensor2d([[1], [2], [3], [4]], [4, 1]);
const ys = tf.tensor2d([[1], [3], [5], [7]], [4, 1]);

// Train model with fit().
model.fit(xs, ys, {epochs: 1000});

// Run inference with predict().
model.predict(tf.tensor2d([[5]], [1, 1])).print();
