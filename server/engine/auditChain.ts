import crypto from 'crypto';
import { AuditEntry, AuditExport } from '../types';

export class AuditChain {
  private chain: AuditEntry[] = [];

  addEntry(eventType: 'FAULT_INJECTED' | 'AGENT_RESPONSE' | 'TEST_COMPLETE', data: Record<string, any>): AuditEntry {
    const previousHash = this.chain.length > 0 
      ? this.chain[this.chain.length - 1].hash 
      : '0'.repeat(64);
    
    const entry: AuditEntry = {
      index: this.chain.length,
      timestamp: new Date().toISOString(),
      eventType,
      data,
      previousHash,
      hash: '' // calculated below
    };

    // Calculate SHA-256 hash excluding the hash property itself
    const dataToHash = {
      index: entry.index,
      timestamp: entry.timestamp,
      eventType: entry.eventType,
      data: entry.data,
      previousHash: entry.previousHash
    };

    entry.hash = crypto
      .createHash('sha256')
      .update(JSON.stringify(dataToHash))
      .digest('hex');

    this.chain.push(entry);
    return entry;
  }

  verify(): boolean {
    if (this.chain.length === 0) return true;

    for (let i = 0; i < this.chain.length; i++) {
      const entry = this.chain[i];
      const expectedPrevHash = i > 0 ? this.chain[i - 1].hash : '0'.repeat(64);

      if (entry.previousHash !== expectedPrevHash) {
        return false;
      }

      const dataToHash = {
        index: entry.index,
        timestamp: entry.timestamp,
        eventType: entry.eventType,
        data: entry.data,
        previousHash: entry.previousHash
      };

      const recomputedHash = crypto
        .createHash('sha256')
        .update(JSON.stringify(dataToHash))
        .digest('hex');

      if (entry.hash !== recomputedHash) {
        return false;
      }
    }

    return true;
  }

  export(): AuditExport {
    const verified = this.verify();
    const signature = crypto
      .createHmac('sha256', 'hexfire-audit-v1')
      .update(JSON.stringify(this.chain))
      .digest('hex');
    return { chain: this.chain, verified, signature };
  }
}
