import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from './users.entity'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService

  const mockUserRepository = {
    findOne() { },
    save() { },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        }
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  test('get method()', () => {
    const email = 'test@gmail.com'
    const user = new User()
    jest.spyOn(mockUserRepository, 'findOne').mockImplementation(async () => user)
    service.get(email)
    expect(mockUserRepository.findOne).toBeCalledWith('test@gmail.com')
  })
})
