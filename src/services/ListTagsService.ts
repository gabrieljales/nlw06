import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/TagsRepositories';
import { classToPlain } from 'class-transformer';


class ListTagsService {

  async execute() {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    const tags = await tagsRepositories.find();
    // tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}` })); // Maneira de fazer sem class-transformer

    return classToPlain(tags);
  }
}

export { ListTagsService };