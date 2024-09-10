import { expect, assert } from 'chai';
import sinon from 'sinon';
import { readInput } from './gptService';

describe('readInput', () => {
    // Mock request object
    it("should return an error if no content is provided", async() =>{
        const req = {
            body: {}
        }
    });
});