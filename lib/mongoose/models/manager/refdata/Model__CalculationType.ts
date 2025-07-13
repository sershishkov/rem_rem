import { Schema, model, models } from 'mongoose';
import { I_CalculationType } from '@/interfaces/refdata';

const calculation_type__Schema = new Schema<I_CalculationType>({
  calculationTypeName: {
    type: String,
    required: [true, 'Please add a calculation_type name'],
    unique: true,
  },
  calculationTypeTitle: {
    type: String,
    required: [true, 'Please add a calculation_title name'],
  },
  // ['Общий',"Цоколь , окна пластик, двери пластик, гибкая черепица, швы межпанельные, швы межпанельные,асфальт, кровля мягкая, кровля жесткая, кровля металлочерепица, кровля шифер,тротуарная плитка ...
});

export default models.calculation_type ||
  model('calculation_type', calculation_type__Schema);
