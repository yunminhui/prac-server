import mongoose from 'mongoose';

export const connect = (DB_HOST) => {
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);
  // Connect to the DB
  mongoose.connect(DB_HOST);
  mongoose.connection.on('error', (err) => {
    console.log(err);
    console.log(
        'MongoDB connection error, Please make sure MongoDB is running ',
    );
    process.exit();
  });
};

export const close = () => {
  mongoose.connection.close();
};
