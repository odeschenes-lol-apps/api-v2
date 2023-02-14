import { Router } from "express";
import { prismaInstance } from "..";

const router = Router();

router.get("/:id", async(req, res) => {
  const { id } = req.params;

  const user = await prismaInstance.user
    .findUnique({
      where: {
        id: id,
      },
    })

  res.send(user);
});

router.post("/:id", (req, res) => {
  const { id } = req.params;

  res.send(id);
});

export default router;

