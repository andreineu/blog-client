import { faker } from "@faker-js/faker";
import {
  Author,
  Comment,
  CommunityBase,
  Post,
  User
} from "../../generated/graphql";

export interface FakePostOptions {
  voteStatus?: 1 | -1 | null;
  id?: number;
  authorId?: number;
}

export interface FakeCommentOptions {
  voteStatus?: 1 | -1 | null;
  id?: number;
  authorId?: number;
}

export interface FakeUserOptions {
  id?: number;
  followStatus?: 1 | null;
}

export interface FakeCommentOptions {
  voteStatus?: 1 | -1 | null;
  id?: number;
  authorId?: number;
}

class Faker {
  user(opts?: FakeUserOptions): User {
    const id = opts?.id || faker.datatype.number();
    const followStatus = opts?.followStatus || null;

    return {
      id,
      followStatus,
      username: faker.lorem.word(),
      createdAt: faker.date.past().getTime().toString(),
      avatar: faker.image.avatar(),
      email: faker.internet.email(),
      rating: faker.datatype.number(),
      totalFollowers: faker.datatype.number(),
      totalPosts: faker.datatype.number(),
      __typename: "User"
    };
  }

  comment(opts?: FakeCommentOptions): Comment {
    const id = opts?.id || faker.datatype.number(100);
    const authorId = opts?.authorId || faker.datatype.number(100);
    const voteStatus = opts?.voteStatus || null;
    const createdAt = faker.date.past().getTime().toString();
    const updatedAt = faker.date
      .between(parseInt(createdAt), Date.now())
      .getTime()
      .toString();

    return {
      id,
      authorId,
      voteStatus,
      createdAt,
      updatedAt,
      body: faker.lorem.paragraph(),
      rating: faker.datatype.number(),
      postId: faker.datatype.number(100),
      parentId: faker.datatype.number(100),
      author: this.author({ id: authorId }),
      __typename: "Comment"
    };
  }

  author(opts?: { id?: number }): Author {
    const id = opts?.id || faker.datatype.number();
    return {
      id,
      username: faker.lorem.word(),
      avatar: faker.image.avatar(),
      createdAt: faker.date.past().getTime().toString(),
      __typename: "Author"
    };
  }

  communityBase(opts?: { id?: number }): CommunityBase {
    const id = opts?.id || faker.datatype.number();
    return {
      id,
      name: faker.lorem.word(),
      summary: faker.lorem.paragraph(),
      avatar: faker.image.avatar(),
      __typename: "CommunityBase"
    };
  }

  post(opts?: FakePostOptions): Post {
    const id = opts?.id || faker.datatype.number(100);
    const authorId = opts?.authorId || faker.datatype.number(100);
    const communityId = opts?.id || faker.datatype.number();
    const voteStatus = opts?.voteStatus || null;
    const createdAt = faker.date.past().getTime().toString();
    const updatedAt = faker.date
      .between(parseInt(createdAt), Date.now())
      .getTime()
      .toString();

    return {
      id,
      authorId,
      communityId,
      voteStatus,
      createdAt,
      updatedAt,
      title: faker.lorem.words(),
      body: faker.lorem.paragraph(),
      rating: faker.datatype.number(),
      totalComments: faker.datatype.number(),
      totalViews: faker.datatype.number(),
      author: this.author({ id: authorId }),
      community: this.communityBase({ id: communityId }),
      __typename: "Post"
    };
  }
}

export const Mock = new Faker();
