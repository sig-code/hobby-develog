import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UsersController } from './users.controller'
import { User } from './users.entity'
import { UsersService } from './users.service'

describe('UsersController', () => {
  let controller: UsersController

  const mockUserService = {
    get() { },
    create() { },
    update() { },
  }

  const mockUserRepository = {
    findOne() { },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        }
      ]
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  describe('get method()', () => {
    test('取得', () => {

      jest.spyOn(mockUserService, 'get').mockImplementation(async () => new User())

      const email = 'test@gmail.com'
      controller.get(email)
      expect(mockUserService.get).toBeCalledWith('test@gmail.com', 'test')

    })
  })


})
