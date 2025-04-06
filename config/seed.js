import db from './connection.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import bcrypt from 'bcryptjs';
import { fakeData } from './fakedata.js'

(async () => {
  try {
    await Promise.all([Product.deleteMany(), User.deleteMany()]);

    const hashedPassword = await bcrypt.hash('password', 10);

    const admin = new User({ username: "Justin", email: "jcase@email.com", password: hashedPassword, role: 'admin' });
    await admin.save();

    const user = new User({ username: 'Will', email: "will@beaconfire.com", password: hashedPassword });

    const productInsert = await Product.insertMany(
      [
        {
          brand: 'Apple',
          name: 'iPhone 13',
          description: 'Latest iPhone model with A15 Bionic chip.',
        },
        {
          brand: 'Samsung',
          name: 'Galaxy S21',
          description: 'Flagship smartphone with Exynos 2100.',
        },
        {
          brand: 'Google',
          name: 'Pixel 6',
          description: 'Smartphone with Google Tensor chip.',
        },
      ],
    );
    user.favorites = productInsert.map((product) => product._id);
    await user.save();

    const productInsert2 = await Product.insertMany(fakeData);

    console.log('DB initialized');
  } catch (error) {
    console.error(error);
  } finally {
    await db.close();
  }
})();
