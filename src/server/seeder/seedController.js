import Category from '../models/categoryModel';
import CheatModel from '../models/cheatModel';
import cheatSeedData from './seedData';

export default async () => {
  try {
    const docCount = await Category.estimatedDocumentCount().exec();

    if (!docCount) {
      Object.keys(cheatSeedData).forEach(name => {
        const newCategory = new Category({ name });

        cheatSeedData[name].forEach(cheat => {
          const newCheat = new CheatModel({ ...cheat, category: newCategory._id });
          newCheat.save();
          newCategory.cheats.push(newCheat);
        });
        newCategory.save();
      });
      console.info('Database has been seeded successfully');
    } else console.info('Database has already been seeded');
  } catch (error) {
    throw new Error('An error occurred when seeding the database');
  }
};
