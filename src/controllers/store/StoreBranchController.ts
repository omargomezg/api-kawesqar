import {BadRequestError, Body, Get, JsonController, OnUndefined, Param, Post, Put} from "routing-controllers";
import {Branch} from "../../entities/Branch";
import {RelationStoreBranch} from "../../entities/RelationStoreBranch";
import {Store} from "../../entities/Store";

@JsonController("/store-branch")
export class StoreBranchController {

    @Get("/")
    public getAll() {
        return RelationStoreBranch.find();
    }

    /**
     * Update an exist relation
     * @param relationId Relation Id
     * @param data A RelationStoreBranch object
     */
    @Post("/:id")
    @OnUndefined(404)
    public async updateRelation(@Param("id") relationId: number, @Body() data: RelationStoreBranch) {
        const relation = await RelationStoreBranch.findOne({where: {id: relationId}});
        if (!relation) {
            throw new BadRequestError(`Relation was not found.`);
        }
        data.id = relationId;
        const store = await Store.findOne(data.store);
        if (store === undefined) {
            throw new BadRequestError(`Store was not found.`);
        }
        const branch = await Branch.findOne(data.branch);
        if (branch === undefined) {
            throw new BadRequestError(`Branch was not found.`);
        }
        return await RelationStoreBranch.save(data);
    }

    /**
     * Create a new relation
     * @param data A RelationStoreBranch object
     */
    @Put("/")
    public async createRelation(@Body() data: RelationStoreBranch) {
        const relationId = Number(data.id);
        const relation = await RelationStoreBranch.findOne({
            where: {
                branch: {
                    id: data.branch.id
                },
                store: {
                    id: data.store.id
                }
            }
        });
        if (relation) {
            throw new BadRequestError(`Relation ${relationId} exists.`);
        }
        return await RelationStoreBranch.save(data);
    }

}
