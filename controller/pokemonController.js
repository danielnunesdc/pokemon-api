import { db } from '../models/index.js';

const Pokemon = db.pokemonModel;

const create = async (req, res) => {
    const pokemon = Pokemon({
        name: req.body.name,
        img: req.body.img,
        attack: req.body.attack,
        hp: req.body.hp,
        defense: req.body.defense,
        speed:req.body.speed,
        active:req.body.active,
    });
    try {
        const data = pokemon.save();
        res.send(data);
    } catch (error) {
        res
            .status(500)
            .send({message: error.message || 'Ocorreu algum erro ao salvar!'});
    }
};

const findAll = async (req, res) => {
    const name = req.query.name;
  
    let condition = name
      ? { name: { $regex: new RegExp(name), $options: 'i' } }
      : {};
  
    try {
      const data = await Pokemon.find(condition);
  
      if (!data) {
        res.status(404).send('Nao encontrado nenhum pokemon');
      } else {
        res.send(data);
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: error.message || 'Erro ao listar todos os documentos' });
    }
  };
  
  const findOne = async (req, res) => {
    const id = req.params.id;
  
    try {
      const data = await Pokemon.findById({ _id: id });
  
      if (!data) {
        res.status(404).send('Nao encontrado nenhum pokemon');
      } else {
        res.send(data);
      }
    } catch (error) {
      res.status(500).send({ message: 'Erro ao buscar o Documento id: ' + id });
    }
  };


const update = async (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: 'Dados para atualizacao vazio',
      });
    }
  
    const id = req.params.id;
  
    try {
      const data = await Pokemon.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
      });
  
      if (!data) {
        res.status(404).send('Nao encontrado nenhum pokemon para atualizar');
      } else {
        res.send(data);
      }
    } catch (error) {
      res.status(500).send({ message: 'Erro ao atualizar o Pokemon id: ' + id });
    }
  };
  
  const remove = async (req, res) => {
    const id = req.params.id;
  
    try {
      const data = await Pokemon.findByIdAndRemove({ _id: id });
  
      if (!data) {
        res.status(404).send('Nao encontrado nenhum pokemon para excluir');
      } else {
        res.send('Pokemon excluido com sucesso');
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Nao foi possivel deletar o Pokemon id: ' + id });
    }
  };
  
  const removeAll = async (req, res) => {
    try {
      const data = await Pokemon.deleteMany();
  
      if (!data) {
        res.status(404).send('Nao encontrado nenhum pokemon para excluir');
      } else {
        res.send('Pokemons excluidos com sucesso');
      }
    } catch (error) {
      res.status(500).send({ message: 'Erro ao excluir todos os Pokemons' });
    }
  };
  
  export default { create, findAll, findOne, update, remove, removeAll };