import { CoreOutput } from '../../common/dtos/output.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';

@ObjectType()
export class AllCategoriesOutput extends CoreOutput {
  // ? <- 표시는 있을수도 있고 없을수도있고 Nullable 역할 수행
  @Field((type) => [Category], { nullable: true })
  categories?: Category[];
}
