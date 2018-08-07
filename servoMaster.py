import RPi.GPIO as GPIO
from time import sleep

def SetAngle(angle, pin, servo):
    duty = angle / 18 + 2.5
    GPIO.output(pin, True)
    servo.ChangeDutyCycle(duty)
    sleep(1.5)
    GPIO.output(pin, False)
    servo.ChangeDutyCycle(0)
    
gripServoPIN = 17
baseServoPIN = 22
armServoPIN = 19
liftServoPIN = 5

GPIO.setmode(GPIO.BCM)
GPIO.setup(gripServoPIN, GPIO.OUT)
GPIO.setup(baseServoPIN, GPIO.OUT)
GPIO.setup(armServoPIN, GPIO.OUT)
GPIO.setup(liftServoPIN, GPIO.OUT)

grip = GPIO.PWM(gripServoPIN, 50) # GPIO 17 for PWM with 50Hz
base = GPIO.PWM(baseServoPIN, 50) # GPIO 22 for PWM with 50Hz
arm = GPIO.PWM(armServoPIN, 50)
lift = GPIO.PWM(liftServoPIN, 50)

lift.start(0)
arm.start(0) # Initialization
#base.start(0)
#SetAngle(180,baseServoPIN, base)

SetAngle(20,armServoPIN, arm)
SetAngle(90,liftServoPIN, lift)
SetAngle(65,armServoPIN, arm)
SetAngle(50,liftServoPIN, lift)
lift.stop()
#base.stop()
arm.stop()
GPIO.cleanup()
GPIO.setwarnings(False)

