import Category from '../models/categoryModel';
import apiResponse from '../helpers/apiResponse';

export default async (request, response) => {
  try {
    const allCategoriesWithCheats = await Category.find()
      .populate({ path: 'cheats', model: 'cheat', select: 'description command keywords' })
      .exec();

    return apiResponse.success(
      response,
      200,
      'Retrieved all categories with cheats',
      allCategoriesWithCheats
    );
  } catch (error) {
    return apiResponse.error(response, 500, apiResponse.generalError);
  }
};
