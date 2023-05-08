import { Request, Response } from "express";
import Post, { PostType } from "../models/posts";

const data_verification = (request: Request, response: Response) => {
    if (
        !request.body.category ||
        !request.body.title ||
        !request.body.name ||
        !request.body.avatar ||
        !request.body.data
      ) {
        return false;
    }
    
      const properties = {
        category: request.body.category,
        title: request.body.title,
        author: {
          name: request.body.name,
          avatar: request.body.avatar,
        },
        data: request.body.data,
      };

      return properties;

};

const getpost = async (request: Request, response: Response) => {

  const documents = await Post.find();
  if (!documents)
    return response.status(400).json({ msg: "No hay post creados" });
  return response.json(documents);
};

const createpost = async (request: Request, response: Response) => {

    const dataVerification = data_verification(request, response);
  if (!dataVerification){
    return response
      .status(400)
      .json({ msg: "Por favor, completa la informacion para poder continuar" });
  }

  const post = new Post(dataVerification);
  await post.save();

  return response.status(200).json({ msg: "El post fue creado satisfactoriamente"})

};

const updatepost = async (request: Request, response: Response) => {
    const { id } = request.params;
    if (
        !request.body.category ||
        !request.body.title ||
        !request.body.name ||
        !request.body.avatar ||
        !request.body.data
      ) {
        return response
          .status(400)
          .json({ msg: "Por favor, completa la informacion para poder continuar" });
      }
    
      const properties = {
        category: request.body.category,
        title: request.body.title,
        author: {
          name: request.body.name,
          avatar: request.body.avatar,
        },
        data: request.body.data,
      };

      const update = await Post.findByIdAndUpdate(id, properties);
      return response.status(200).json({ msg: "Post se ha actualizado satisfactoriamente"})

};

const deletepost = async (request: Request, response: Response) => {
    const { id } = request.params;

    const clear = await Post.findByIdAndDelete(id);

    return response.status(200).json({ msg: "Post se ha eliminado satisfactoriamente"})
};

export { getpost, createpost, updatepost, deletepost };