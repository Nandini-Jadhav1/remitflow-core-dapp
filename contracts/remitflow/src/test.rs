#![cfg(test)]
use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env, String};

fn setup() -> (Env, RemitFlowContractClient<'static>) {
    let env = Env::default();
    env.mock_all_auths();
    let contract_id = env.register_contract(None, RemitFlowContract);
    let client = RemitFlowContractClient::new(&env, &contract_id);
    (env, client)
}

#[test]
fn test_record_payment() {
    let (env, client) = setup();
    let sender = Address::generate(&env);
    let recipient = Address::generate(&env);
    let id = client.record_payment(
        &sender, &recipient, &1000,
        &String::from_str(&env, "XLM"),
        &String::from_str(&env, "hash1"),
    );
    assert_eq!(id, 1);
}

#[test]
fn test_get_payment() {
    let (env, client) = setup();
    let sender = Address::generate(&env);
    let recipient = Address::generate(&env);
    client.record_payment(
        &sender, &recipient, &500,
        &String::from_str(&env, "XLM"),
        &String::from_str(&env, "hash2"),
    );
    let p = client.get_payment(&1).unwrap();
    assert_eq!(p.amount, 500);
}

#[test]
fn test_payment_count() {
    let (env, client) = setup();
    let sender = Address::generate(&env);
    let recipient = Address::generate(&env);
    assert_eq!(client.get_payment_count(), 0);
    client.record_payment(&sender, &recipient, &100,
        &String::from_str(&env, "XLM"),
        &String::from_str(&env, "h1"));
    client.record_payment(&sender, &recipient, &200,
        &String::from_str(&env, "XLM"),
        &String::from_str(&env, "h2"));
    assert_eq!(client.get_payment_count(), 2);
}

#[test]
fn test_total_sent() {
    let (env, client) = setup();
    let sender = Address::generate(&env);
    let recipient = Address::generate(&env);
    client.record_payment(&sender, &recipient, &300,
        &String::from_str(&env, "XLM"),
        &String::from_str(&env, "h1"));
    client.record_payment(&sender, &recipient, &700,
        &String::from_str(&env, "XLM"),
        &String::from_str(&env, "h2"));
    assert_eq!(client.get_total_sent(&2), 1000);
}