import { ProductosService } from './productos.service';
import { NotFoundException } from '@nestjs/common';

const ProductsFake = [
    { id: 1, name: 'Papel', descripcion: 'Papel rosa', stock: 26 },
    { id: 2, name: 'Piedra', descripcion: 'Piedra cafe', stock: 50 },
];

// export type IProduct = {id:number, name:string, descripcion:string, stock:number};

jest.mock('bcrypt');

describe('ProductsService', () => {

    let service: ProductosService;
    let fakeRepo: any;

    beforeEach(() => {
        jest.clearAllMocks(); // Limpiar los mocks antes de cada test
        // Crear un fake repo para realizar los test
        fakeRepo = {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        service = new ProductosService(fakeRepo as any);

    })

    it('Deberia devolver todos los productos', async () => {
        // Organizar
        fakeRepo.find.mockResolvedValue(ProductsFake);
        // Actuar
        const resultProducts = await service.allProducts();
        // Afirmar
        expect(resultProducts.length).toBeGreaterThan(0);
        expect(fakeRepo.find).toHaveBeenCalled();
    })

    it('Deberia devolver un prodcucto', async () => {
        fakeRepo.findOne.mockResolvedValue(ProductsFake[0]);
        const resultProducts = await service.oneProduct(1);

        expect(fakeRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(resultProducts.name).toEqual('Papel');
    })


    it('Deberia lanzar una excepción de tipo NotFoundException si el producto no existe', async () => {
        fakeRepo.findOne.mockResolvedValue(null);

        await expect(service.oneProduct(10)).rejects.toThrow(NotFoundException);
        expect(fakeRepo.findOne).toHaveBeenCalledWith({ where: { id: 10 } });

    })

    it('Deberia crear un producto', async () => {

        const newUserMock = { name: 'Lapices', descripcion: 'Grafito No 2', stock: 10 };
        fakeRepo.save.mockResolvedValue({ ...newUserMock, id: 3 });
        const result = await service.createProduct(newUserMock as any);
        expect(result.id).toBe(3);
    })

    it('Deberia actualizar un producto', async () => {
        const updateDataMock = { id: 1, name: 'Papel cuadriculado' };
        fakeRepo.update.mockResolvedValue({ affected: 1 });
        fakeRepo.findOne.mockResolvedValue(updateDataMock);

        const result = await service.updateProduct(1, { name: 'Papel cuadriculado'  });
        expect(fakeRepo.update).toHaveBeenCalledWith(1, { name: 'Papel cuadriculado'});
        expect(result.name).toEqual('Papel cuadriculado');
    })

})