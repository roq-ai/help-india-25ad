import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { panCardValidationSchema } from 'validationSchema/pan-cards';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.pan_card
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPanCardById();
    case 'PUT':
      return updatePanCardById();
    case 'DELETE':
      return deletePanCardById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPanCardById() {
    const data = await prisma.pan_card.findFirst(convertQueryToPrismaUtil(req.query, 'pan_card'));
    return res.status(200).json(data);
  }

  async function updatePanCardById() {
    await panCardValidationSchema.validate(req.body);
    const data = await prisma.pan_card.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePanCardById() {
    const data = await prisma.pan_card.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
