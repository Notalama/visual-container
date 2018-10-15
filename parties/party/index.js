import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Party, { schema } from './model'

const router = new Router()
const { list, count } = schema.tree

/**
 * @api {post} /parties Create party
 * @apiName CreateParty
 * @apiGroup Party
 * @apiParam list Party's list.
 * @apiParam count Party's count.
 * @apiSuccess {Object} party Party's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Party not found.
 */
router.post('/',
  body({ list, count }),
  create)

/**
 * @api {get} /parties Retrieve parties
 * @apiName RetrieveParties
 * @apiGroup Party
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of parties.
 * @apiSuccess {Object[]} rows List of parties.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /parties/:id Retrieve party
 * @apiName RetrieveParty
 * @apiGroup Party
 * @apiSuccess {Object} party Party's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Party not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /parties/:id Update party
 * @apiName UpdateParty
 * @apiGroup Party
 * @apiParam list Party's list.
 * @apiParam count Party's count.
 * @apiSuccess {Object} party Party's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Party not found.
 */
router.put('/:id',
  body({ list, count }),
  update)

/**
 * @api {delete} /parties/:id Delete party
 * @apiName DeleteParty
 * @apiGroup Party
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Party not found.
 */
router.delete('/:id',
  destroy)

export default router
