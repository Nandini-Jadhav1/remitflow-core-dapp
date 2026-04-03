#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype,
    Address, Env, String,
    symbol_short,
};

#[contracttype]
#[derive(Clone)]
pub struct Payment {
    pub sender: Address,
    pub recipient: Address,
    pub amount: i128,
    pub asset: String,
    pub timestamp: u64,
    pub tx_hash: String,
}

#[contracttype]
pub enum DataKey {
    Payment(u64),
    PaymentCount,
}

#[contract]
pub struct RemitFlowContract;

#[contractimpl]
impl RemitFlowContract {
    pub fn record_payment(
        env: Env,
        sender: Address,
        recipient: Address,
        amount: i128,
        asset: String,
        tx_hash: String,
    ) -> u64 {
        sender.require_auth();
        let count: u64 = env
            .storage()
            .instance()
            .get(&DataKey::PaymentCount)
            .unwrap_or(0);
        let payment_id = count + 1;
        let payment = Payment {
            sender: sender.clone(),
            recipient: recipient.clone(),
            amount,
            asset,
            timestamp: env.ledger().timestamp(),
            tx_hash,
        };
        env.storage()
            .instance()
            .set(&DataKey::Payment(payment_id), &payment);
        env.storage()
            .instance()
            .set(&DataKey::PaymentCount, &payment_id);
        env.events().publish(
            (symbol_short!("payment"), symbol_short!("sent")),
            (sender, recipient, amount, payment_id),
        );
        payment_id
    }

    pub fn get_payment(env: Env, payment_id: u64) -> Option<Payment> {
        env.storage()
            .instance()
            .get(&DataKey::Payment(payment_id))
    }

    pub fn get_payment_count(env: Env) -> u64 {
        env.storage()
            .instance()
            .get(&DataKey::PaymentCount)
            .unwrap_or(0)
    }

    pub fn get_total_sent(env: Env, count: u64) -> i128 {
        let mut total: i128 = 0;
        for i in 1..=count {
            if let Some(payment) = env
                .storage()
                .instance()
                .get::<DataKey, Payment>(&DataKey::Payment(i))
            {
                total += payment.amount;
            }
        }
        total
    }
}