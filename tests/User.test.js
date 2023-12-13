const { User, Board } = require('../models/index');
const UserController = require('../controllers/UserController');
const { mockRequest, mockResponse } = require('jest-mock-req-res');

jest.mock('../models/index', () => ({
  User: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    destroy: jest.fn(),
  },
  Board: {
    create: jest.fn(),
    destroy: jest.fn()
  },
}));

describe('UserController Tests', () => {

    afterEach(async () => {
        // Clear the User and Board tables after each test
        await User.destroy({ where: {} });
        await Board.destroy({ where: {} });
        jest.clearAllMocks(); 
      });
  
    // Tests for GetUsers function
    it('should fetch all users', async () => {
      User.findAll.mockResolvedValue([]);
  
      const req = mockRequest();
      const res = mockResponse();
  
      await UserController.GetUsers(req, res);
  
      expect(User.findAll).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith([]);
    });
  
    // Tests for GetUserByPk function
    it('should fetch a user by ID', async () => {
      const fetchedUser = { id: 1, name: 'Fetched User', email: 'fetched@example.com' };
      User.findByPk.mockResolvedValue(fetchedUser);
  
      const req = mockRequest({ params: { userid: 1 } });
      const res = mockResponse();
  
      await UserController.GetUserByPk(req, res);
  
      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(fetchedUser);
    });
  
    // Tests for UpdateUser function
    it('should update a user', async () => {
      const updatedUser = { id: 1, name: 'Updated User', email: 'updated@example.com' };
      User.update.mockResolvedValue([1, [updatedUser]]);
  
      const req = mockRequest({ body: { name: 'Updated User', email: 'updated@example.com' }, params: { userId: 1 } });
      const res = mockResponse();
  
      await UserController.UpdateUser(req, res);
  
      expect(User.update).toHaveBeenCalledWith(
        { name: 'Updated User', email: 'updated@example.com' },
        { where: { id: 1 }, returning: true }
      );
      expect(res.send).toHaveBeenCalledWith([1, [updatedUser]]);
    });
  
    // Tests for DestroyUser function
    it('should delete a user by ID', async () => {
      User.findOne.mockResolvedValue({ id: 1 });
      User.destroy.mockResolvedValue(1);
  
      const req = mockRequest({ params: { userId: 1 } });
      const res = mockResponse();
  
      await UserController.DestroyUser(req, res);
  
      expect(User.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(User.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Deleted user with id 1' });
    });
  
    // Tests for GetAllUserData function
    it('should fetch all users with boards and tasks', async () => {
      const users = [
        {
          id: 1,
          name: 'User1',
          Boards: [{ id: 1, title: 'Board1', Tasks: [{ id: 1, title: 'Task1' }] }]
        }
      ];
      User.findAll.mockResolvedValue(users);
  
      const req = mockRequest();
      const res = mockResponse();
  
      await UserController.GetAllUserData(req, res);
  
      expect(User.findAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });
  
