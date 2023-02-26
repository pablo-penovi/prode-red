import { createRouter } from "./context";
import { z } from "zod";

export const DNI_REGEX = new RegExp('^[F|M|0-9]?[0-9]{7}$', 'i')

export const userRouter = createRouter()
  .mutation("setDni", {
    input: z
      .object({
        id: z.string().uuid('El ID del usuario no tiene un formato válido'),
        dni: z.string()
          .min(7, 'El DNI debe tener 7 caracteres como mínimo')
          .max(8, 'El DNI debe tener 8 caracteres como máximo')
          .regex(DNI_REGEX, 'El DNI no tiene un formato válido'),
      }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          dni: input.dni.toUpperCase()
        }
      })
    },
  });
