import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Category } from '../entities/category.entity';

@ArgsType()
export class CategoryInput {
  @Field((type) => String)
  slug: string;
}

/**
 *  CoreOuput 은 모둔 output 객체에 공통으로 들어가는 필드들을 담고있음
 */
@ObjectType()
export class CategoryOutput extends CoreOutput {
  @Field((type) => Category, { nullable: true })
  category?: Category;
}
