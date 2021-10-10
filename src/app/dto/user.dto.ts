/* tslint:disable:variable-name */
import { Deserializable } from './deserializable.dto';

export class UserDto implements Deserializable {

  public id: string;
  public created_at: string;
  public api_key: string;
  public usage: [any];
  public email: string;
  public host: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

}
