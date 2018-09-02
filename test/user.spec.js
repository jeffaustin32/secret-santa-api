const server = require("../src/server");
const supertest = require("supertest")(server);
const expect = require('chai').expect;
const sinon = require('sinon');

const db = require('../src/config/db');

describe("/user", () => {
    describe('POST /user/:username', () => {
        it("Responds with 'Hello, World!' 1", () => {
            // var stub = sinon.stub(db, 'one');
            // stub.resolves({ response: "ok" });

            var stub = sinon.stub(db, "one");
            supertest
                .get("/user/")
                .expect(200)
                // .expect((res) => {
                //     console.log(res);
                //     expect(1).to.be.a('number');
                // })
                .end(() => {
                    console.log('res', stub.callCount);
                    expect(stub.callCount).to.equal(1, "Called once");
                    stub.restore();
                });

        });
    });
    describe('POST /user', () => {
        it("Responds with 'Hello, World!'", () => {
            expect(1).to.be.a('number');
        });
    });
});
