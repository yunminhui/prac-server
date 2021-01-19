// writable request
const Mutation = {
  newNote: async (parent, args, {models}) => {
    return await models.Note.create({
      content: args.content,
      author: 'INUS',
    });
  },
  deleteNote: async (parent, {ids}, {models}) => {
    try {
      for (let i = 0; i < ids.length; i++) {
        await models.Note.findOneAndRemove({_id: ids[i]});
      }
      return true;
    } catch (err) {
      return false;
    }
  },
  updateNote: async (parent, {id, content}, {models}) => {
    return await models.Note.findOneAndUpdate(
        {_id: id},
        {$set: {content}},
        {new: true},
    );
  },
};

export default Mutation;
