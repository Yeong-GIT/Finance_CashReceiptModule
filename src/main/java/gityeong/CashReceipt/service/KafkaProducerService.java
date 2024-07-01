package gityeong.CashReceipt.service;

import gityeong.CashReceipt.entity.CashReceipt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    @Autowired
    private KafkaTemplate<String, CashReceipt> kafkaTemplate;

    public void sendMessage(String topic, CashReceipt message) {
        kafkaTemplate.send(topic, message);
    }
}
