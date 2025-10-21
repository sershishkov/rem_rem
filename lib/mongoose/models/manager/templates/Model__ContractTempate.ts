import { Schema, model, models } from 'mongoose';
import {
  I_ContractTempate,
  I_ContractTempateChapter,
} from '@/interfaces/refdata';

const contractTempate__Schema = new Schema<I_ContractTempate>({
  templateContractName: {
    type: String,
    required: [true, 'Please add a templateContract name'],
    unique: true,
  },
  templateContractHeader: {
    type: String,
    default: 'Пока нет описания',
  },
  templateContractDescription: {
    type: String,
    default: 'Пока нет описания',
  },
  contractPreambule: {
    type: String,
    default: 'Пока нет описания',
  },
  contractBody: [{} as I_ContractTempateChapter],
});

export default models.contractTempate ||
  model('contractTempate', contractTempate__Schema);
