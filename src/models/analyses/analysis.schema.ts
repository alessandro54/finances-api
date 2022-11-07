import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { User } from '../../models/users/user.schema';

export type AnalysisDocument = HydratedDocument<Analysis>;

@Schema()
export class Analysis {
  //!  Input Data
  //? Precio de Venta (PV) //
  @Prop({ required: true })
  salePrice: number;

  //? % Cuota inicial (pCI) //
  @Prop({ required: true, min: 0, max: 100 })
  initialFee: number;

  //? Numero de años (NA) //
  @Prop({ required: true, min: 1 })
  years: number;

  //? Frecuencia (f) //
  @Prop({ required: true, min: 30 })
  frequency: number;

  //? Numero de días por año (NDxA) //
  @Prop({ required: true })
  currency: number;

  //? Costes Notariales (CosNot) //
  @Prop({ default: 0 })
  notarialCosts: number;

  //? Costes Registrales (CosReg) //
  @Prop({ default: 0 })
  registryCosts: number;

  //? Tasación (Tas) //
  @Prop({ default: 0 })
  appraisal: number;

  //? Comisión de estudio (ComEst) //
  @Prop({ default: 0 })
  studyCommission: number;

  //? Comisión de activación (ComAct) //
  @Prop({ default: 0 })
  activationCommission: number;

  //? Comisión Periódica (ComPer) //
  @Prop({ required: true, default: 0 })
  periodicCommission: number;

  ///? Portes (PortesPer) //
  @Prop({ default: 0 })
  shipping: number;

  //? Gastos Administrativos (GasAdmPer) //
  @Prop({ default: 0 })
  administrativeExpenses: number;

  //? % Seguro de desgravamen(pSegDeg) //
  @Prop({ default: 0 })
  disabilityInsurance: number;

  //? % Seguro contra todo riesgo (pSegRie) //
  @Prop({ required: true, min: 0, max: 100 })
  allRiskInsurance: number;

  //? % Tasa de descuento (COK) //
  @Prop({ required: true, min: 0, max: 100 })
  discountRate: number;

  @Prop()
  calculatedAt: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const AnalysisSchema = SchemaFactory.createForClass(Analysis);
