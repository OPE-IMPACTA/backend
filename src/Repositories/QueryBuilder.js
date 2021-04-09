class QueryBuilder {
    #query = []

    #addStep (step, data) {
        this.#query.push({
            [step]: data
        })
        return this
    }

    match (data) {
        return this.#addStep('$match', data)
    }

    group (data) {
        return this.#addStep('$group', data)
    }

    unwind (data) {
        return this.#addStep('$unwind', data)
    }

    lookup (data) {
        return this.#addStep('$lookup', data)
    }

    project (data) {
        return this.#addStep('$project', data)
    }

    skip (data) {
        return this.#addStep('$skip', data)
    }

    limit (data) {
        return this.#addStep('$limit', data)
    }

    sort (data) {
        return this.#addStep('$sort', data)
    }

    build () {
        return this.#query
    }
}

module.exports = QueryBuilder
