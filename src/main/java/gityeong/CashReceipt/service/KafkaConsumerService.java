package gityeong.CashReceipt.service;

import gityeong.CashReceipt.entity.CashReceipt;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "cash-receipt-topic", groupId = "finance-group")
    public void consume(CashReceipt cashReceipt) {
        System.out.println("Consumed message: " + cashReceipt);
    }
}
